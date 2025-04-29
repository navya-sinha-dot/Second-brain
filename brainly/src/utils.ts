export function random(len: number) {
  let options = "bdureh92ei83ue309030993933";
  let length = options.length;

  let ans = "";

  for (let i = 0; i < len; i++) {
    ans = ans + options[Math.floor(Math.random() * length)];
  }
  return ans;
}
