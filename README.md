# intern-web
Bài tập dành cho thực tập web

## Cách thức làm bài và nộp bài
- Cung cấp tài khoản github cá nhân, để Pionero thêm vào repo tương ứng
- Sau khi thêm vào repo, Pionero sẽ thông báo url của repo
- Clone repo về máy local
- Tạo nhánh mới tên `feature/week_x`, với `x` là tuần tương ứng
- Làm việc trên nhánh mới này
- Khi nào xong thì tạo MR (merge request) tới nhánh `main` và assign cho `@dominhhai` review MR tương
- Pionero sẽ review source code và đưa ra feedback

## Bài tập

### 1. Tuần 1
#### Mục đích
- Làm quen với Node.js
- Làm quen với async
- Làm quen với phân hoá module

#### Nội dung
Viết 1 chương trình Node.js thực hiện các việc sau:
  - Cho đầu vào là 1 số nguyên dương bất kì từ tham số dòng lệnh
  - Nếu số nhập vào là số nguyên tố thì in ra danh sách tất cả các file ở CWD (current working directory)
  - Nếu số nhập vào không phải là số nguyên tố thì in ra nội dung của 1 file bất kì ở thư mục cha của CWD

Yêu cầu:
  - kiểm tra đầu vào
  - không được sử dụng bất kì hàm đồng bộ ( sync ) nào ( bắt buộc sử dụng async function )
  - Với mỗi tác vụ ( in danh sách file, in nội dung file ) cần viết ra 1 file riêng

### 2. Tuần 2

#### Mục đích
- async nâng cao
- Làm quen với HTTP client

#### Nội dung
Viết 1 chương trình Node.js thực hiện các việc sau:
  - Crawl cùng lúc nhiều 5 trang web, url của 5 trang này được lưu trong 1 mảng
  - In ra màn hình title của trang web theo đúng thứ tự của mảng các url ở trên

Yêu cầu:
  - Kiểm tra lỗi phát sinh nếu có
  - Không sử dụng bất cứ package ngoài nào

### 3. Tuần 3
#### Mục đích
- Làm quen với HTTP server
- Làm quen với server side rendering

#### Nội dung
Viết 1 web server bằng Node.js thực hiện các việc sau:
  - Trang chủ `/` hiển thị hello web server
  - Trang time `/time` trả ra thời gian của server tại thời điểm request với định dạng `YYYY/MM/DD hh:mm:ss`
  - Trang `/time/day` trả ra thứ trong tuần. Ví dụ: `Sunday`

Yêu cầu:
  - Dùng thư viện Expressjs cho web server
  - Dùng thư viện EJS cho html template
  - Dùng thư viện bootstrap cho css

### 4. Tuần 4
#### Mục đích
- Làm quen với SQL ORM
- Làm quen với session web

#### Nội dung
Viết 1 web server bằng Node.js thực hiện các việc sau:
  - Trang chủ `/login` cho phép người dùng đăng nhập bằng email và password
  - Trang `/todo` cho phép người dùng xem danh sách, search bởi trạng thái và title các todos của mình
  - Trang `/todo` cho phép người dùng xoá todo, đổi trạng thái todo
  - Trang `todo/:id` cho phép edit todo có id là `:id` của mình

Todo có dạng như sau:
```
{
  id: int, // todo id
  title: string(30), // title of todo
  desc: string(200), // description
  is_done: boolean // true: done, false: todo
}
```

Yêu cầu:
  - Dùng thư viện Expressjs cho web server
  - Dùng thư viện Pugjs cho html template
  - Dùng thư viện bootstrap cho css
  - Sử dụng PostgreSQL với Prisma ORM
  - Dùng thư viện tailwind cho css
  - Không sử dụng ajax, api. Phải render phía server side


### 5. Tuần 5
#### Mục đích
- Làm quen với API
- Làm quen với frontend framework
#### Nội dung
Làm lại tuần 4 với các yêu cầu như sau:
- không render phía server
- toàn bộ trang sử dụng Vuejs/Reactjs để render
- data được lấy thông qua API
