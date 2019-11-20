package main

import (
	L "./facedetect"
	"fmt"
)

func main() {
	L.CreateNewRec()
	fmt.Println(L.TestForFace("test1.jpg"))
	fmt.Println(L.Rec)
}