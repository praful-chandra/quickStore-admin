export default  function _imageEncode(arrayBuffer) {
   // let u8 = new Uint8Array(arrayBuffer);
    let b64encoded = btoa(
      [].reduce.call(
        new Uint8Array(arrayBuffer),
        function (p, c) {
          return p + String.fromCharCode(c);
        },
        ""
      )
    );
    let mimetype = "image/png";
    return "data:" + mimetype + ";base64," + b64encoded;
  }