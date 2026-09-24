package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/tetratelabs/wazero"
	"github.com/tetratelabs/wazero/imports/wasi_snapshot_preview1"
	"github.com/tetratelabs/wazero/sys"
)

func main() {
	ctx := context.Background()
	runtime := wazero.NewRuntimeWithConfig(ctx, wazero.NewRuntimeConfigInterpreter())
	defer runtime.Close(ctx)
	wasi_snapshot_preview1.MustInstantiate(ctx, runtime)
	modulePath := "../common/add.wasm"
	if len(os.Args) > 1 {
		modulePath = os.Args[1]
	}
	wasm, err := os.ReadFile(modulePath)
	if err != nil {
		panic(err)
	}
	moduleConfig := wazero.NewModuleConfig().WithStdout(os.Stdout).WithStderr(os.Stderr).
		WithWalltime(func() (int64, int32) { return time.Now().Unix(), int32(time.Now().Nanosecond()) }, 1_000).
		WithNanotime(func() int64 { return time.Now().UnixNano() }, 1).
		WithSysNanosleep()
	module, err := runtime.InstantiateWithConfig(ctx, wasm, moduleConfig)
	if err != nil {
		panic(err)
	}
	function := module.ExportedFunction("add")
	if function != nil {
		result, err := function.Call(ctx, 20, 22)
		if err != nil {
			panic(err)
		}
		fmt.Println(result[0])
		return
	}
	function = module.ExportedFunction("_start")
	if function == nil {
		panic("module exports neither add nor _start")
	}
	_, err = function.Call(ctx)
	if err != nil {
		if exitErr, ok := err.(*sys.ExitError); ok && exitErr.ExitCode() == 0 {
			return
		}
		panic(err)
	}
}
