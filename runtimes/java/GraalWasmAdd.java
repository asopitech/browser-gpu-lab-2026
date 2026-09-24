import java.io.File;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;

public final class GraalWasmAdd {
  public static void main(String[] args) throws Exception {
    try (var context = Context.newBuilder("wasm").allowAllAccess(true).build()) {
      var source = Source.newBuilder("wasm", new File(args[0])).build();
      var module = context.eval(source);
      var instance = module.newInstance();
      var exports = instance.getMember("exports");
      System.out.println(exports.getMember("add").execute(20, 22).asInt());
    }
  }
}
