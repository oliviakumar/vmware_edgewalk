package recognition

import  (
    "fmt"
    "log"
    "os"
    "io/ioutil"
    "strings"
    "path/filepath"
    "github.com/Kagami/go-face"
)

//Struct for storing individual samples, id, and name
type TrainStruct struct {
    Data []face.Descriptor
    Index []int32
    Name string
}

//Struct that returns the approval or denial of the image given
type GofaceData struct {
    Identity  string `json:"identity"`
    Accepted  bool `json:"accepted"`
    Location  string `json:"location"`
    Entrytype string `json:"type"`
    Imagepath string `json:"imagePath"`
}

//Global recognizer object
var rec *face.Recognizer

//Data directory for training the model
var dataDir = "trainImages"

//Map that contains all the trained entries, makes it easier to retrieve info
var Model map[int]TrainStruct

var samples []face.Descriptor
var indSamples []face.Descriptor
var tracker []int32
var indTracker []int32
var count int = 0
var indCount int = 0

var valid bool
var found bool
var approved bool

//Updates the variables and directory so that it can be resused for training a new person
func UpdateDescriptor() {
    indSamples = nil
    indTracker = nil
    valid = false
    indCount = indCount + 1
}

//Updates the samples and id tracker for the samples so the model can be retrained
func UpdateSamples() {
    indCount = 0
    count = 0
    samples = nil
    tracker = nil
}

//Returns a map of trained identities with their information
func ReturnModel() (map[int]TrainStruct) {
    return Model
}

//Return the address of the rec pointer
func ReturnRec() (*face.Recognizer) {
    return rec
}

//Traverses through the given file and finds any ".jpg" to train the model with
func DirTraverse(file string) {
    fi, err := os.Stat(file)
    if err != nil {
        fmt.Println(err)
        return
    }

    switch mode := fi.Mode(); {
    //If the file given is a directory
    case mode.IsDir():
        files, err := ioutil.ReadDir(file)
        if err != nil {
            log.Fatal(err)
        }

        for _, f2 := range files {
            newDir := filepath.Join(file, f2.Name())
            DirTraverse(newDir)
        }

        pathSplit := strings.Split(file, "/")

        //Updating count, which will be used as id
        if (valid == true) {
            PopulateDescriptor(pathSplit[1])
        }
    //If the file given is a regular file
    case mode.IsRegular():
        //Checks if the file is a jpg or png
        if (strings.HasSuffix(file, ".jpg") == true || strings.HasSuffix(file, ".jpeg") == true) {
            faces, err := rec.RecognizeFile(file)
            if (err != nil) {
                log.Fatalf("Can't recognize image")
            }

            //Calling populateDescriptor
            if (len(faces) >= 1) {
                valid = true
                samples = append(samples, faces[0].Descriptor)
                indSamples = append(indSamples, faces[0].Descriptor)
                tracker = append(tracker, int32(count))
                indTracker = append(indTracker, int32(count))
                count = count + 1
            }
        }
    }
}

//Populates the Train struct, and stores it into a map
func PopulateDescriptor(name string) {
    var entry TrainStruct
    entry.Data = indSamples
    entry.Index = indTracker
    entry.Name = name

    Model[indCount] = entry
    rec.SetSamples(samples, tracker)

    UpdateDescriptor()
}

//Training the model from a fixed directory called "trainImages"
func Train() {
    UpdateSamples()
    Model = make(map[int]TrainStruct)
    var err error

    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }

    DirTraverse(dataDir)
}

//Testing the model by giving a certain image name within the "testImages" directory
func Infer(imgPath string) (GofaceData) {
    newDir := "imgtest"
    imgPath = filepath.Join(newDir, imgPath)
    approved = false

    var gofaceData GofaceData
    gofaceData = GofaceData{
        Identity: "",
        Accepted:  approved,
        Location:  "",
        Entrytype: "",
        Imagepath:	imgPath,
    }

    testPic, err := rec.RecognizeSingleFile(imgPath)

    if err != nil {
        return gofaceData
    }

    if testPic == nil {
        return gofaceData
    }

    picID := rec.ClassifyThreshold(testPic.Descriptor, 0.4)
    if picID < 0 {
        return gofaceData
    } 
    
    approved = true
    var person string
    for i := 0; i < len(Model); i++ {
        var arr []int32 = Model[i].Index
        if (int32(picID) >= arr[0] && int32(picID) <= arr[(len(arr) - 1)]) {
            person = Model[i].Name
            break
        }
    }

    if (approved) {
        location := "Front Door"
        entryType := "I"

        gofaceData = GofaceData{
            Identity: person,
            Accepted:  approved,
            Location:  location,
            Entrytype: entryType,
            Imagepath:	imgPath,
        }
    } 
    
    return gofaceData
}