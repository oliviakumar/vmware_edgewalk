package main

import  (
    "fmt"
    "log"
    "os"
    "io/ioutil"
    "strings"
    "path/filepath"
    "github.com/Kagami/go-face"
)

var dataDir = "images"
var count int = 0

var samples []face.Descriptor
var id []int32
var labels []string

//Changes the dataDir to given filename
func changeDir(folder string) {
    dataDir = filepath.Join(dataDir, folder)
}

//Resets data directory
func resetDir() {
    dataDir = "images"
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
            fmt.Println(newDir)
            
            dirTraverse(newDir, rec, name)
        }

        //Updating count, which will be used as id
        count = count + 1
        fmt.Println("This is samples length: ", len(samples))
    //If the file given is a regular file
    case mode.IsRegular():
        //Checks if the file is a jpg. Working on making this accept all images 
        if (strings.HasSuffix(file, ".jpg") == true) {
            faces, err := rec.RecognizeFile(file)

            if (err != nil) {
                log.Fatalf("Can't recognize image")
            }

            //Calling populateDescriptor
            if (len(faces) >= 1) {
                populateDescriptor(rec, faces, name)
            }
        }
    }
}

//Populates the descriptor, id associated with the face, and name of the person
func populateDescriptor(rec *face.Recognizer, faces []face.Face, name string) {
    samples = append(samples, faces[0].Descriptor)
    id = append(id, int32(count))
    labels = append(labels, name)
}


func main () {
    fmt.Println("Facial Recognition System")
    
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
    rec.SetSamples(samples, id)
    resetDir()

    //Changing directory and training for Mushahid
    changeDir("Mushahid")
    //Will work on generalizing the rec object
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    defer rec.Close()

    name = "Mushahid Hassan"
    //Traversing through Mushahid directory
    dirTraverse(dataDir, rec, name)
    rec.SetSamples(samples, id)
    resetDir()

    //Changing directory and training for Tanja
    changeDir("Tanja")
    //Will work on generalizing the rec object
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    defer rec.Close()

    name = "Tanja Nuendel"
    //Traversing through Tanja directory
    dirTraverse(dataDir, rec, name)
    rec.SetSamples(samples, id)
    resetDir()

    //Changing directory and training for Olivia
    changeDir("Olivia")
    //Will work on generalizing the rec object
    rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    defer rec.Close()
    
    name = "Olivia Kumar"
    //Traversing through Olivia directory
    dirTraverse(dataDir, rec, name)
    rec.SetSamples(samples, id)
    resetDir()

    //Testing (Can use this as a basic test case for the model training)
    //Uncomment to test using "mushTest.jpg"
    // testMush := filepath.Join(dataDir, "mushTest.jpg")
    // mush, err := rec.RecognizeSingleFile(testMush)
    
    // if err != nil {
    //     log.Fatalf("Can't recognize: %v", err)
    // }
    
    // if mush == nil {
    //     log.Fatalf("Not a single face on the image")
    // }
    
    // mushID := rec.Classify(mush.Descriptor)
    // if mushID < 0 {
    //     log.Fatalf("Can't classify")
    // }

    // fmt.Println("ID that matches the pic: ", mushID)
    // for i := 0; i < len(id); i++ {
    //     if (id[i] == int32(mushID)) {
    //         fmt.Println("Name that matches the pic: ", labels[i])
    //         break
    //     }
    // } 
}