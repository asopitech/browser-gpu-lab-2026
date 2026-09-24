use wgpu::Backends;

/// Shared adapter discovery used by native and wasm builds.
pub async fn available_backends_async() -> String {
    let instance = wgpu::Instance::new(wgpu::InstanceDescriptor::new_without_display_handle());
    let adapters = instance.enumerate_adapters(Backends::all()).await;
    adapters
        .iter()
        .map(|adapter| format!("{:?}", adapter.get_info().backend))
        .collect::<Vec<_>>()
        .join(", ")
}

#[cfg(not(target_arch = "wasm32"))]
pub fn available_backends() -> String {
    pollster::block_on(available_backends_async())
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub async fn detect_backends() -> String {
    available_backends_async().await
}
