package main

import (
	"fmt"
	"math/rand"
	"time"
)
	
type generateBool struct {
	src       rand.Source
	cache     int64
	remaining int
}

func (b *generateBool) Bool() bool {
	if b.remaining == 0 {
		b.cache, b.remaining = b.src.Int63(), 63
	}

	result := b.cache&0x01 == 1
	b.cache >>= 1
	b.remaining--

	return result
}

func New() *generateBool {
    return &generateBool{src: rand.NewSource(time.Now().UnixNano())}
}

func main() {
	r := New()
	fmt.Println(r.Bool())
}
