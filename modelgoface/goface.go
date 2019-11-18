package lib

import  (
    // L "./lib"
    "fmt"
    "log"
    "os"
    "io/ioutil"
    "io"
    "os/exec"
    "strings"
    "path/filepath"
    // "time"
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

type Recognizer struct {
    Rec *face.Recognizer
}

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

func NewRecognizer() Recognizer {
    return Recognizer{}
}

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

//Traverses through the given file and finds any ".jpg" to train the model with
func DirTraverse(file string, rec *face.Recognizer, name string) {
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
            DirTraverse(newDir, rec, name)
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

//Writes a shell script that opens an image path
func WriteToFile(filename string, data string) error {
    file, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer file.Close()

    var newData string = "#!/bin/bash\n"
    _, err = io.WriteString(file, newData)

    newData = fmt.Sprintf("open %s", data)
    _, err = io.WriteString(file, newData)
    if err != nil {
        return err
    }

    return file.Sync()
}

//Traverses through the training images folders to find the image match
//**Only for demonstration purposes**
func FindPic(file string, rec *face.Recognizer, pic face.Descriptor) {
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
            if (found) {
                found = false
                break
            }
            newDir := filepath.Join(file, f2.Name())
            FindPic(newDir, rec, pic)
        }

    //If the file given is a regular file
    case mode.IsRegular():
        if (strings.HasSuffix(file, ".jpg") == true || strings.HasSuffix(file, ".jpeg") == true || strings.HasSuffix(file, ".png") == true) {
            tempFaces, err := rec.RecognizeFile(file)

            if (err != nil) {
                log.Fatalf("Can't recognize image")
            }

            //Finds the correct file and sends it's name to shell script
            if (len(tempFaces) >= 1) {
                if (pic == tempFaces[0].Descriptor) {
                    fmt.Println("Trained image path: ", file)
                    //Writing shell script to open the training picture that matches the picture given
                    //**Change path when running locally**
                    WriteToFile("/Users/mushahidhassan/go/src/demo/open-pic.sh", file)

                    fmt.Println("Opening image used to train...")
                    //Executing shell script
                    //**Change path when running locally**
                    c := exec.Command("/Users/mushahidhassan/go/src/demo/open-pic.sh")
                    if err2 := c.Run(); err2 != nil {
                        fmt.Println("Error: ", err2)
                    }

                    found = true
                    break
                }
            }
        }
    }
}

//Testing to see if the face resembles that of a trained individual
func (r *Recognizer) test(images map[string]bool) (string, bool, string, string) {
    files, err := ioutil.ReadDir(dataDir)
    if err != nil {
        log.Fatal(err)
    }

    var testPath string
    var execute bool
    for _, file := range files {
        if (strings.HasSuffix(file.Name(), ".jpg") == true || strings.HasSuffix(file.Name(), ".jpeg") == true) {
            if (images[file.Name()] == false) {
                images[file.Name()] = true
                execute = true
                testPath = filepath.Join(dataDir, file.Name())
                break
            }
        }
    }

    if (execute) {
        testPic, err := (*(&r.Rec)).RecognizeSingleFile(testPath)
        if err != nil {
            log.Fatalf("Can't recognize: %v", err)
        }

        if testPic == nil {
            approved = false
            log.Fatalf("Picture Match: %t", approved)
        }

        picID := (*(&r.Rec)).Classify(testPic.Descriptor)
        if picID < 0 {
            log.Fatalf("Can't classify")
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

        location := "Front Door"
        entryType := "I"
        // @TODO currently unused, we actually just need the imgPath that's in the service anyways
        //path := testPath
        Update()
        //Uncomment if you want to pull up the most accurate match with picture that was used to train
        // FindPic(dataDir, rec, samples[picID])

        return person, approved, location, entryType

    } else {
        person := ""
        approved = false
        location := ""
        entryType := ""
        //path := ""

        return person, false, location, entryType
    }
    // @TODO Doesn't this make the function always return empty data with false?
    return "", false, "", ""
}

func (r Recognizer) Train() {
    Model = make(map[int]TrainStruct)

    //Changing directory and training for Chris
    ChangeDir("Chris")
    var err error
    var rec *face.Recognizer
    rec, err = face.NewRecognizer(dataDir)
    r.Rec = rec
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    // defer r.Rec.Close()

    var name string = "Chris Smith"
    //Traversing through Chris directory
    DirTraverse(dataDir, r.Rec, name)
    r.Rec.SetSamples(samples, tracker)
    Update()

    //Changing directory and training for Mushahid
    ChangeDir("Mushahid")
    rec, err = face.NewRecognizer(dataDir)
    r.Rec = rec
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    // defer r.Rec.Close()

    name = "Mushahid Hassan"
    //Traversing through Mushahid directory
    DirTraverse(dataDir, r.Rec, name)
    r.Rec.SetSamples(samples, tracker)
    Update()

    //Changing directory and training for Tanja
    ChangeDir("Tanja")
    rec, err = face.NewRecognizer(dataDir)
    r.Rec = rec
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    // defer r.Rec.Close()

    name = "Tanja Nuendel"
    //Traversing through Tanja directory
    DirTraverse(dataDir, r.Rec, name)
    r.Rec.SetSamples(samples, tracker)
    Update()

    //Changing directory and training for Olivia
    ChangeDir("Olivia")
    rec, err = face.NewRecognizer(dataDir)
    r.Rec = rec
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    // defer r.Rec.Close()

    name = "Olivia Kumar"
    //Traversing through Olivia directory
    DirTraverse(dataDir, r.Rec, name)
    r.Rec.SetSamples(samples, tracker)
    Update()
    if &r.Rec != nil {
        fmt.Println("Done training")
        fmt.Println("This is rec: ", r.Rec)
    } else {
        fmt.Println("Rec is nil")
    }
}

func ReturnModel() (mod map[int]TrainStruct) {
    return Model
}

func (r *Recognizer) TestForFace(imgPath string) bool {
    // @TODO rework. hasFace set always true for testing purposes
    var hasFace = true
    return hasFace
}

// Method called by
func (r *Recognizer) Infer(imgPath string) GofaceData{
    // do reognition
    images := make(map[string]bool)
    // @TODO put in correct path to directory of imgPath (convert from single imgPath to directory path!)
    dataDir = "./imgPath"
    person, approved, location, entryType := r.test(images)

    //
    gofaceData := GofaceData{
        Identity: person,
        Accepted:  approved,
        Location:  location,
        Entrytype: entryType,
        Imagepath:	imgPath,
    }
    return gofaceData
}

/* future Infer() method
func (r Recognizer) Run() {
    fmt.Println("This is rec in run(): ", r.Rec)
    images := make(map[string]bool)

    // for {
    dataDir = "images/testImages"
    Identity, Accepted, Location, Entrytype, Imagepath := r.test(images)

    RecogData := GofaceData{
        Identity: Identity,
        Accepted:  Accepted,
        Location:  Location,
        Entrytype: Entrytype,
        Imagepath:	Imagepath,
    }

    if (Identity != "") {
        fmt.Println(RecogData.Identity)
        fmt.Println(RecogData.Accepted)
        fmt.Println(RecogData.Location)
        fmt.Println(RecogData.Entrytype)
        fmt.Println(RecogData.Imagepath)
    }

    approved = false
    // }

 */
