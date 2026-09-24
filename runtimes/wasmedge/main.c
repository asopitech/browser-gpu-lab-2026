#include <stdio.h>
#include "wasmedge/wasmedge.h"

int main(int argc, char **argv) {
  if (argc != 2) {
    fprintf(stderr, "usage: wasmedge_add MODULE.wasm\n");
    return 2;
  }
  WasmEdge_VMContext *vm = WasmEdge_VMCreate(NULL, NULL);
  if (vm == NULL) return 3;
  WasmEdge_String module_name = WasmEdge_StringCreateByCString("module");
  WasmEdge_Result result = WasmEdge_VMRegisterModuleFromFile(vm, module_name, argv[1]);
  if (!WasmEdge_ResultOK(result)) {
    fprintf(stderr, "%s\n", WasmEdge_ResultGetMessage(result));
    WasmEdge_VMDelete(vm);
    return 4;
  }
  WasmEdge_Value params[2] = {WasmEdge_ValueGenI32(20), WasmEdge_ValueGenI32(22)};
  WasmEdge_Value returns[1];
  WasmEdge_String function_name = WasmEdge_StringCreateByCString("add");
  result = WasmEdge_VMExecuteRegistered(vm, module_name, function_name, params, 2, returns, 1);
  if (!WasmEdge_ResultOK(result)) {
    fprintf(stderr, "%s\n", WasmEdge_ResultGetMessage(result));
    WasmEdge_VMDelete(vm);
    return 5;
  }
  printf("%d\n", WasmEdge_ValueGetI32(returns[0]));
  WasmEdge_VMDelete(vm);
  return 0;
}
