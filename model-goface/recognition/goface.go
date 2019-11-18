package lib

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

type GofaceData struct {
    Identity  string `json:"identity"`
    Accepted  bool `json:"accepted"`
    Location  string `json:"location"`
    Entrytype string `json:"type"`
    Imagepath string `json:"imagePath"`
}

var rec *face.Recognizer

//Data directory for training the model
var dataDir = "images"

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

//Changes the dataDir to given filename
func ChangeDir(folder string) {
    dataDir = filepath.Join(dataDir, folder)
}

//Updates the variables and directory so that it can be resused for training a new person
func Update() {
    dataDir = "images"
    indSamples = nil
    indTracker = nil
    valid = false
    indCount = indCount + 1
}

func ReturnModel() (mod map[int]TrainStruct) {
    return Model
}

func ReturnRec() (*face.Recognizer) {
    return rec
}

//Traverses through the given file and finds any ".jpg" to train the model with
func DirTraverse(file string, name string) {
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
            DirTraverse(newDir, name)
        }

        //Updating count, which will be used as id
        if (valid == true) {
            PopulateDescriptor(name)
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
}

func Train() {
    Model = make(map[int]TrainStruct)
    var err error

    //Changing directory and training for Chris
    ChangeDir("Chris")
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }

    var name string = "Chris Smith"
    //Traversing through Chris directory
    DirTraverse(dataDir, name)
    rec.SetSamples(samples, tracker)
    Update()

    //Changing directory and training for Mushahid
    ChangeDir("Mushahid")
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }

    name = "Mushahid Hassan"
    //Traversing through Mushahid directory
    DirTraverse(dataDir, name)
    rec.SetSamples(samples, tracker)
    Update()

    //Changing directory and training for Tanja
    ChangeDir("Tanja")
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }

    name = "Tanja Nuendel"
    //Traversing through Tanja directory
    DirTraverse(dataDir, name)
    rec.SetSamples(samples, tracker)
    Update()

    //Changing directory and training for Olivia
    ChangeDir("Olivia")
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }

    name = "Olivia Kumar"
    //Traversing through Olivia directory
    DirTraverse(dataDir, name)
    rec.SetSamples(samples, tracker)
    Update()

}

func Infer(imgPath string) (GofaceData) {
    dataDir = "images/testImages"
    imgPath = filepath.Join(dataDir, imgPath)

    testPic, err := rec.RecognizeSingleFile(imgPath)
    if err != nil {
        log.Fatalf("Can't recognize: %v", err)
    }

    if testPic == nil {
        approved = false
        log.Fatalf("Picture Match: %t", approved)
    }

    picID := rec.ClassifyThreshold(testPic.Descriptor, 0.4)
    if picID < 0 {
        panic("Can't classify")
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

    var gofaceData GofaceData
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
    } else {
        gofaceData = GofaceData{
            Identity: "",
            Accepted:  approved,
            Location:  "",
            Entrytype: "",
            Imagepath:	imgPath,
        }
    }

    Update()
    return gofaceData

}

func TestForFace(imgPath string) bool {
    var hasFace = false
    dataDir = "images/testImages"

    imgPath = filepath.Join(dataDir, imgPath)
    faces, err := rec.RecognizeFile(imgPath)
    if (err != nil) {
        log.Fatalf("Unable to open file.")
    }

    if (len(faces) >= 1) {
        hasFace = true
    }

    return hasFace
}