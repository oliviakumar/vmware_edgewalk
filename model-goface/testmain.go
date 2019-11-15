package main

import (
    L "./lib"
    "fmt"
)

func main() {
    rec := L.NewRecognizer()
    rec.Train()
    if &rec.Rec != nil {
        rec.Run()
    } else {
        fmt.Println("Rec is nil")
    }
}