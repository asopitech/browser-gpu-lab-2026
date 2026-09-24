package main

import (
	"context"
	"fmt"
	"os"

	"github.com/tetratelabs/wazero"
)

func main() {
	ctx := context.Background()
	runtime := wazero.NewRuntime(ctx)
	defer runtime.Close(ctx)
	modulePath := "../common/add.wasm"
	if len(os.Args) > 1 {
		modulePath = os.Args[1]
	}
	wasm, err := os.ReadFile(modulePath)
	if err != nil {
		panic(err)
	}
	module, err := runtime.Instantiate(ctx, wasm)
	if err != nil {
		panic(err)
	}
	result, err := module.ExportedFunction("add").Call(ctx, 20, 22)
	if err != nil {
		panic(err)
	}
	fmt.Println(result[0])
}
