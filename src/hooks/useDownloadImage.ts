import axios from 'axios';
import Toast from '@/components/Toast/Toast';
import Loading from '@/components/Loading/Loading';

interface downloadObj {
  url: string;
  name: string;

  [propName: string | number]: any;
}

const downloadImage = async (item: downloadObj) => {
  try {
    Loading.Loading.show('下载中');
    const res = await axios({
      url: item.url,
      responseType: 'arraybuffer',
    });
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(new Blob([res.data]));
    a.href = url;
    a.download = res.config.url!.substring(res.config.url!.length - 9);
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  } catch (error) {
    Toast.Toast.showError(error, 'downloadImage');
  } finally {
    Loading.Loading.hide();
  }
};
export default downloadImage;
