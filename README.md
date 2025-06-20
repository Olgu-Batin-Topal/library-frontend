## Projeyi Çalıştırma ve Yayınlama Talimatları

Bu proje **React19 + Vite** ile geliştirilmiştir. Aşağıdaki adımları takip ederek projeyi yerel ortamda çalıştırabilir veya dağıtıma hazır hale getirebilirsiniz.

### Geliştirme Ortamında Çalıştırma

1. Gerekli paketleri yükleyin:

   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   ```

3. Tarayıcınızdan aşağıdaki adrese giderek projeyi görüntüleyebilirsiniz:
   ```
   http://localhost:5173
   ```

### Projeyi Yayınlama

1. Projeyi derleyin:

   ```bash
   npm run build
   ```

2. Derlenen dosyalar `dist` klasöründe bulunacaktır. Bu klasörün içerisindekileri bir web sunucusuna yükleyerek projeyi yayınlayabilirsiniz.

3. Dosyaların doğru bir şekilde sunulabilmesi için, tüm yönergelerin `index.html` dosyasına yönlendirilmesi gerektiğini unutmayın. Bunun için .htaccess yapılandırma dosyası veya sunucu yapılandırması kullanabilirsiniz.
