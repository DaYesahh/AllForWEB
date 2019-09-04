function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 1000)
  )
}

async function main() {
  //console.time();

  await wait();
  await wait();
  await wait();
//  console.timeEnd();

}
main();