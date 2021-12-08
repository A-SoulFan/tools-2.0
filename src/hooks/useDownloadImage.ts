import axios from "axios";
import Toast from "@/components/Toast/Toast"
interface downloadObj {
  url: string;
  name: string;

  [propName: string | number]: any;
}

const downloadImage = async (item: downloadObj) => {
  console.log(item);
  try {
    const res = await axios({
      url: item.url,
      responseType: "arraybuffer"
    });

    const a = document.createElement("a");
    const url = window.URL.createObjectURL(new Blob([res.data]));
    a.href = url;
    a.download = item.name;
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    Toast.Toast.showError(error)
  }
};
export default downloadImage;
