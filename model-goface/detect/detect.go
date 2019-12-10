package detect

import (
    "log"
    "path/filepath"

    "github.com/Kagami/go-face"
)
//Tests to see if an image contains a face. Returns true if face detected, false otherwise
func TestForFace(imgPath string) bool {
    rec, err := face.NewRecognizer("../../../model-goface/trainImages")
    if (err != nil) {
        log.Fatalf("Error opening directory.")
    }
    var hasFace = false
    dataDir := "../../../model-goface/testImages"

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
