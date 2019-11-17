package main

import (
    "fmt"
    "github.com/Kagami/go-face"
    "github.com/edgexfoundry/vmware_edgewalk/device-goface/internal/modelgoface/lib"
)
// test with and without


type Rec struct {
    *face.Recognizer
}

func main() {
    rec := lib.NewRecognizer()
    rec.Train()
    if &rec.Rec != nil {
        rec.Run()
    } else {
        fmt.Println("Rec is nil")
    }
}