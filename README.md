<<<<<<< HEAD
# E-Commerce Product Management
 Full-stack product management system for an e-commerce platform. Backend: NestJS + PostgreSQL. Frontend: React. Features: JWT Authentication, CRUD operations, modals for add/edit, and secure API endpoints.
=======
# E-Ticaret Ürün Yönetim Sistemi

Bu proje, kullanıcıların giriş yaparak ürünleri yönetebildiği basit bir e-ticaret ürün yönetim sistemidir.
**NestJS (Backend) ve React (Frontend) ile geliştirilmiştir.**

## 📌 Proje Özellikleri
- **JWT Authentication:** Kullanıcı giriş yaparak sisteme erişebilir.
- **Ürün Yönetimi:** Ürün ekleme, düzenleme, silme ve listeleme işlemleri yapılabilir.
- **Yetkilendirme:** Ürün işlemleri yalnızca giriş yapan kullanıcılar tarafından gerçekleştirilebilir.

---

## 🚀 Kurulum

### 1️⃣ **Gereksinimler**
Bu projeyi çalıştırabilmek için aşağıdaki teknolojilere ihtiyacınız var:
- [Node.js](https://nodejs.org/) (v16+ önerilir)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### 2️⃣ **Projeyi Kopyalayın**
```bash
 git clone https://github.com/kullanici/proje-adi.git
 cd proje-adi
```

### 3️⃣ **Backend Kurulumu (NestJS)**
```bash
 cd backend
 npm install
```
#### **Çevre Değişkenlerini Ayarlayın (.env dosyası oluşturun)**
```env
 DB_HOST=localhost
 DB_PORT=5432
 DB_USERNAME=postgres
 DB_PASSWORD=yourpassword
 DB_NAME=ecommerce
 JWT_SECRET=supersecretkey
```

#### **Veritabanını Çalıştırın**
```bash
 npm run start:dev
```

### 4️⃣ **Frontend Kurulumu (React)**
```bash
 cd frontend
 npm install
 npm start
```

---

## 📌 Kullanım
### 1️⃣ **Test Kullanıcı Bilgileri**
```
Email: test@example.com
Şifre: 123456
```
### 2️⃣ **Özellikler**
- **Giriş Yap:** Kullanıcı bilgileriyle giriş yapılabilir.
- **Ürünleri Görüntüle:** Giriş yapan kullanıcı ürünleri listeleyebilir.
- **Ürün Ekle:** Yeni ürün ekleyebilirsiniz (Modal açılır).
- **Ürün Güncelle:** Mevcut ürünleri güncelleyebilirsiniz (Modal açılır).
- **Ürün Sil:** Ürünleri silmeden önce onay alınır.

---

## 🚀 API Endpointler (Backend İçin)
| Metot  | URL | Açıklama |
|--------|-----------------|--------------------------------|
| **POST** | `/auth/login` | Kullanıcı giriş yapar |
| **GET** | `/products` | Tüm ürünleri getirir |
| **POST** | `/products` | Yeni ürün ekler |
| **PUT** | `/products/:id` | Ürünü günceller |
| **DELETE** | `/products/:id` | Ürünü siler |

---

## 🎯 Geliştirici Notları
- Eğer `.env` dosyanızdaki bilgileri doğru ayarlamazsanız, veritabanına bağlanamazsınız.
- JWT token süresi dolduğunda tekrar giriş yapmanız gerekmektedir.

---

## 💡 Katkıda Bulunma
Eğer projeye katkıda bulunmak isterseniz, **Pull Request** açabilirsiniz! 🎉

>>>>>>> 039a9a5 (Initial commit)
