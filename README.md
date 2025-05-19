# doc_mgmt
User and document management using Angular

## Features

### User Management
- User Registration and Login with JWT Authentication
- Role-based Access Control: `Admin`, `Editor`, `Viewer`
- Session management with access token

### Document Management
- Upload documents with titles
- View list of uploaded documents
- View file details (title, uploaded at, uploaded by)
- **Edit document title or replace file** (only by Admin or Editor)
- **Delete documents** (only by Admin or Editor)

### Ingestion Management
- Trigger document ingestion (Admin/Editor)
- View ingestion status and timestamps

***

## Setup Instructions for Frontend - Angular

### 1. Make sure docker desktop is running successfully, Docker Compose build and run command
```bash
docker-compose up --build
```

OR

### 1. npm build
```bash
npm build
```

### 2. Run the application
```bash
ng serve
```

Visit `http://127.0.0.1:4200/` in your browser

***

### UI Images

![register](https://github.com/user-attachments/assets/7d59c304-5cdb-4c01-b0de-a4721d8fb0ae)

![login](https://github.com/user-attachments/assets/6acb62ce-5513-44b7-94dd-cde49d6ff865)

![displaying_documents](https://github.com/user-attachments/assets/2ff6d48d-f0fb-4055-b76e-07f9a612daa4)

![upload document](https://github.com/user-attachments/assets/e39ffc97-ced0-416b-b2d9-097c7b85601a)

![new_file_uploaded](https://github.com/user-attachments/assets/89ca30fb-799a-449e-a212-1f9d35664068)

![update_file](https://github.com/user-attachments/assets/e15669c4-7b4b-4a37-897e-710291234072)

![file_updated](https://github.com/user-attachments/assets/b4d8d786-5bbe-473a-a97c-b351b9572d71)

![deleting_document](https://github.com/user-attachments/assets/1b520b51-24da-420a-a9f9-8c99723df111)

![document_deleted](https://github.com/user-attachments/assets/169af91f-0304-47ce-9ad5-5a76bef2e13a)

![triggered_ingestion](https://github.com/user-attachments/assets/fc6b4d65-2667-412b-bf5e-f2b192b4fbaf)

![view_ingestions](https://github.com/user-attachments/assets/51f1c46d-6f8a-4568-af32-f5a2292e39b0)

#### Please click on username to view admin functionality
![admin_view](https://github.com/user-attachments/assets/ff0a7591-7b22-44b5-bb0e-0f13222003f8)

![update_role](https://github.com/user-attachments/assets/65a48a0f-3d00-425a-bbf9-630d6f759e99)

![updated](https://github.com/user-attachments/assets/7ff6d8fc-95d9-448a-98b0-6e575a7076fa)

***

### Backend Endpoints

![register](https://github.com/user-attachments/assets/fc98f63d-5f4e-45eb-b862-b79323b7dfee)

![login](https://github.com/user-attachments/assets/de1e5504-17b9-4956-82d2-5ce3ba9b2996)

![upload](https://github.com/user-attachments/assets/67de7b89-1e3a-4e9d-8600-20670718bd2c)

![get_document_by_id](https://github.com/user-attachments/assets/1b16333a-23db-4fd4-9624-86adbc33cf3f)

![get_all_documents](https://github.com/user-attachments/assets/d761d21d-f87a-4bb9-b9f0-f0261cf3ee72)

![update_document](https://github.com/user-attachments/assets/17fa6f2d-bd1f-4369-8428-2348b32f9fc3)

![delete_document](https://github.com/user-attachments/assets/395cbcf7-36d6-4d38-8f36-4ebfb7de4b57)

![admin_get_users](https://github.com/user-attachments/assets/bffabc0c-3874-4d0f-b9d7-775de27d4c41)

![admin_get_user](https://github.com/user-attachments/assets/9f33c270-33bf-48bc-a6bc-ee54361cb775)

![admin_update_user](https://github.com/user-attachments/assets/f009e200-0ab3-4083-a1fa-84f4d2e44608)

![admin_delete_user](https://github.com/user-attachments/assets/bf6f9e70-065b-47fe-b997-74819d109443)

![trigger_ingestion](https://github.com/user-attachments/assets/77d04276-1128-45ed-9f5d-c7ee5a66b58a)

![view_ingestions](https://github.com/user-attachments/assets/d951157a-ea25-4a27-aa7d-30e8c59e0cc9)
