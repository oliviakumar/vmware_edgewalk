package main

import  (
    "fmt"
    "log"
    "os"
    "io/ioutil"
    "io"
    "os/exec"
    "strings"
    "path/filepath"
    "github.com/Kagami/go-face"
)

//Struct for storing individual samples, id, and name
type Train struct {
    data []face.Descriptor
    index []int32
    name string
}

//Data directory for training the model
var dataDir = "images"

//Map that contains all the trained entries, makes it easier to retrieve info
var model map[int]Train

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
func changeDir(folder string) {
    dataDir = filepath.Join(dataDir, folder)
}

//Updates the variables and directory so that it can be resused for training a new person
func update() {
    dataDir = "images"
    indSamples = nil
    indTracker = nil
    indCount = indCount + 1
}

//Traverses through the given file and finds any ".jpg" to train the model with
func dirTraverse(file string, rec *face.Recognizer, name string) {
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
            dirTraverse(newDir, rec, name)
        }

        //Updating count, which will be used as id
        if (valid == true) {
            populateDescriptor(name)
        }
    //If the file given is a regular file
    case mode.IsRegular():
        //Checks if the file is a jpg or png
        if (strings.HasSuffix(file, ".jpg") == true || strings.HasSuffix(file, ".jpeg") == true || strings.HasSuffix(file, ".png") == true) {
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
func populateDescriptor(name string) {
    var entry Train
    entry.data = indSamples    
    entry.index = indTracker
    entry.name = name

    model[indCount] = entry
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
func findPic(file string, rec *face.Recognizer, pic face.Descriptor) {
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
                break
            }
            newDir := filepath.Join(file, f2.Name())
            findPic(newDir, rec, pic)
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
func test(rec *face.Recognizer, picName string) (status bool, person string) {
    dataDir = "images/testImages"
    testPath := filepath.Join(dataDir, picName)
    testPic, err := rec.RecognizeSingleFile(testPath)
    
    if err != nil {
        log.Fatalf("Can't recognize: %v", err)
    }
    
    if testPic == nil {
        approved = false
        log.Fatalf("Picture Match: %t", approved)
    }
    
    picID := rec.Classify(testPic.Descriptor)
    if picID < 0 {
        log.Fatalf("Can't classify")
    }

    approved = true
    // fmt.Println("Picture Match: ", approved)

    for i := 0; i < len(model); i++ {
        var arr []int32 = model[i].index
        if (int32(picID) >= arr[0] && int32(picID) <= arr[(len(arr) - 1)]) {
            // fmt.Println("ID that matches the pic: ", i)
            // fmt.Println("Name that matches the pic: ", model[i].name)
            person = model[i].name
            break
        }
    }

    update()    
    //Uncomment if you want to pull up the most accurate match with picture that was used to train
    //findPic(dataDir, rec, samples[picID])
    
    return approved, person
}

func main () {
    fmt.Println("Facial Recognition System")
    model = make(map[int]Train)

    //Changing directory and training for Chris
    changeDir("Chris")
    rec, err := face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    defer rec.Close()

    var name string = "Chris Smith"
    //Traversing through Chris directory
    dirTraverse(dataDir, rec, name)
    rec.SetSamples(samples, tracker)
    update()
    
    //Changing directory and training for Mushahid
    changeDir("Mushahid")
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    defer rec.Close()

    name = "Mushahid Hassan"
    //Traversing through Mushahid directory
    dirTraverse(dataDir, rec, name)
    rec.SetSamples(samples, tracker)
    update()

    //Changing directory and training for Tanja
    changeDir("Tanja")
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    defer rec.Close()

    name = "Tanja Nuendel"
    //Traversing through Tanja directory
    dirTraverse(dataDir, rec, name)
    rec.SetSamples(samples, tracker)
    update()

    //Changing directory and training for Olivia
    changeDir("Olivia")
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    defer rec.Close()
    
    name = "Olivia Kumar"
    //Traversing through Olivia directory
    dirTraverse(dataDir, rec, name)
    rec.SetSamples(samples, tracker)
    update()
    
    //Testing using the command line argument
    arg := os.Args[1]
    status, person := test(rec, arg)
    if (status) {
        fmt.Println("Approved");
        fmt.Println("Welcome, ", person);
    } else {
        fmt.Println("Denied, Anonymous");
    }
}