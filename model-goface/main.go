package main

import (
	L "./recognition"
	"fmt"
)

func main() {
	L.Train()
	fmt.Println(L.ReturnRec())

	result := L.Infer("test1.jpg")
	fmt.Println(result.Identity)
	fmt.Println(result.Accepted)
	fmt.Println(result.Location)
	fmt.Println(result.Entrytype)
	fmt.Println(result.Imagepath)
}