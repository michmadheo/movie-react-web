//Kodingan di bawah ini bisa langsung di copy/paste dan di tes di website https://replit.com/languages/javascript
////////////////////////////////////

function bubbleSort(array) {
  //Di Fungsi ini saya mengurutkan Alfabet yang sudah di ubah ke bentuk angka pada sortManual()
  let done = false;
  while (!done) {
    done = true;
    for (let i = 1; i < array.length; i += 1) {
      if (array[i - 1] > array[i]) {
        done = false;
        let tmp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = tmp;
      }
    }
  }
  //Saya kembalikan kembali menjadi angka yang sudah di urutkan
  return array;
}

//Fungsi di bawah ini saya pakai untuk mensorting tiap2 item pada array arr. fungsi ini punya hasil yang sama dengan sort() dari ES6
function sortManual(string){
let stringToArray = string.toLowerCase().split('')
//Saya membuat deretan angka disini untuk menentukan huruf mana dan indeks ke berapa
let alp = ['rd','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let changedArr = []
let numtoString = []
for(let i = 0; i < stringToArray.length; i++){
  for(let k = 0; k < alp.length;k++){
    if(stringToArray[i] === alp[k]){
      changedArr.push(k)
    }
  }
}
//Disini saya memanggil fungsi bubbleSort() untuk mengurutkan alfabet yang sudah di jadikan angka
let sortedArr = bubbleSort(changedArr)
for(let j = 0; j < sortedArr.length; j++){
  for(let l = 0; l < alp.length;l++){
    //Disini saya mengubah angka yang sudah diurutkan tadi kembali menjadi alfabet
    if(sortedArr[j] === alp.indexOf(alp[l])){
      numtoString.push(alp[l])
    }
  }
}
//Setelah diubah jadi alfabet, saya gunakan .join() untuk menyatukan kembali
//Misal ['k','i','t','a'] berubah menjadi "kita"
return numtoString.join('')
}
//Titik start ada disini, variabel arr berupa array kata2 yang akan di sorting menurut Anagram
let arr = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"]
let anagramArr = []
let sortedArrList = []
let checkedWords = []


for(let i = 0; i < arr.length; i++){
  //Karena tidak boleh pakai fungsi ES6 .sort(), saya buat sendiri sorting nya dengan nama fungsi sortManual()
  sortedArrList.push(sortManual(arr[i]))
}

for(let a = 0; a < sortedArrList.length; a++){
let test = []
if(!checkedWords.includes(sortedArrList[a])){
  //Saya melakukan pengecekan apa teks selanjutnya sudah pernah di periksa Anagram nya atau belum
  checkedWords.push(sortedArrList[a])
  for(let b = 0; b < sortedArrList.length; b++){
    if(sortedArrList[a] === sortedArrList[b]){
      test.push(arr[b])
    }
  }
}
//Kalau sudah selesai pengecekan, kalau array penampung nya tidak kosong, maka akan di masukkan kedalam array Anagram
if(test.length>0){
    anagramArr.push(test)
  }
}
//Output yang di hasilkan:
// [
//   [ 'kita', 'atik', 'tika' ],
//   [ 'aku', 'kua' ],
//   [ 'kia' ],
//   [ 'makan' ]
// ]
console.log(anagramArr)
