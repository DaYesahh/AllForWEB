function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 1* 1000)
  )
}

async function main() {
//  console.time();
  const x = wait;
  const y = wait;
  const z = wait;
  console.log(new Date())
  await x();
  console.log(new Date())  
  await y();
  console.log(new Date())  
  await z();
  console.log(new Date())  
  //console.timeEnd();
}
main();