package lib

import  (
    "github.com/Kagami/go-face"
    "log"
    "path/filepath"
)

//Data directory for training the model
var dataDir = "trainImages"

//Recognizer object
var Rec *face.Recognizer

//Creates a new recognizer object for detecting faces
func CreateNewRec() {
    var err error
    Rec, err = face.NewRecognizer(dataDir)
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }

    Update()
}

//Updates the variables and directory so that it can be resused for training a new person
func Update() {
    dataDir = "trainImages"
}

//Tests to see if an image contains a face. Returns true if face detected, false otherwise
func TestForFace(imgPath string) bool {
    var hasFace = false
    dataDir = "testImages"

    imgPath = filepath.Join(dataDir, imgPath)
    faces, err := Rec.RecognizeFile(imgPath)
    if (err != nil) {
        log.Fatalf("Unable to open file.")
    }

    if (len(faces) >= 1) {
        hasFace = true
    }

    return hasFace
}