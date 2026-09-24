import com.dylibso.chicory.runtime.Instance;
import com.dylibso.chicory.wasm.Parser;
import java.io.File;

public final class ChicoryAdd {
  public static void main(String[] args) {
    var module = Parser.parse(new File(args[0]));
    var instance = Instance.builder(module).build();
    var result = instance.export("add").apply(20, 22);
    System.out.println(result[0]);
  }
}
