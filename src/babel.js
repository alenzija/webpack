async function start() {
  return await new Promise((r) => setTimeout(() => r('Async done.'), 2000));
}

start().then((res) => console.log(res));

class Util {
  static id = Date.now();
}

console.log('Util Id:', Util.id);
