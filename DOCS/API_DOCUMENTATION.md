# API Documentation

Complete API reference for the Node.js Express PostgreSQL Prisma starter template.

## 🌐 Base URL

```
Development: http://localhost:5000
Production: https://your-domain.com
```

## 📋 API Overview

All API endpoints are prefixed with `/api/v1/` and return JSON responses.

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "path": "/api/v1/endpoint",
    "message": "Detailed error message"
  }
}
```

## 🔐 Authentication

### JWT Token Authentication

Most endpoints require authentication using JWT tokens.

**Header Format**:
```
Authorization: Bearer <access_token>
```

### Refresh Token

Refresh tokens are stored in HTTP-only cookies and used to generate new access tokens.

## 👥 User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| `SUPER_ADMIN` | Full system access | All endpoints |
| `ADMIN` | Administrative access | Most endpoints |
| `EDITOR` | Content editing access | Limited endpoints |
| `PUBLISHER` | Publishing access | Limited endpoints |
| `USER` | Basic user access | Basic endpoints |

## 🔑 Authentication Endpoints

### Login User

**POST** `/api/v1/auth/login`

Authenticate user with email and password.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Logged in successfully!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "needPasswordChange": false
  }
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `401` - Invalid credentials
- `500` - Server error

---

### Refresh Token

**POST** `/api/v1/auth/refresh-token`

Generate new access token using refresh token.

**Request**: Cookie with refresh token

**Response**:
```json
{
  "success": true,
  "message": "Access token generated successfully!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Status Codes**:
- `200` - Success
- `401` - Invalid refresh token
- `500` - Server error

---

### Change Password

**POST** `/api/v1/auth/change-password`

Change user password (requires authentication).

**Headers**: `Authorization: Bearer <access_token>`

**Request Body**:
```json
{
  "oldPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Password Changed successfully",
  "data": null
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `401` - Authentication required
- `403` - Invalid old password
- `500` - Server error

---

### Forgot Password

**POST** `/api/v1/auth/forgot-password`

Send password reset email to user.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Check your email!",
  "data": null
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `404` - User not found
- `500` - Server error

---

### Reset Password

**POST** `/api/v1/auth/reset-password`

Reset password using token from email.

**Headers**: `Authorization: Bearer <reset_token>`

**Request Body**:
```json
{
  "newPassword": "newpassword"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Password Reset!",
  "data": null
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `401` - Invalid token
- `500` - Server error

## 👤 User Management Endpoints

### Create User

**POST** `/api/v1/user/create-user`

Create a new user with profile information.

**Request**: Multipart form data

**Form Data**:
```
data: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
file: [profile image file] (optional)
```

**Response**:
```json
{
  "success": true,
  "message": "User Created successfully!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `409` - Email already exists
- `500` - Server error

---

### Get My Profile

**GET** `/api/v1/user/me`

Get current user's profile information.

**Headers**: `Authorization: Bearer <access_token>`

**Response**:
```json
{
  "success": true,
  "message": "My profile data fetched!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "isActive": true,
    "profileImage": "https://cloudinary.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Success
- `401` - Authentication required
- `500` - Server error

---

### Update Profile

**PUT** `/api/v1/user/update-profile`

Update current user's profile information.

**Headers**: `Authorization: Bearer <access_token>`

**Request**: Multipart form data

**Form Data**:
```
data: {
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
file: [new profile image file] (optional)
```

**Response**:
```json
{
  "success": true,
  "message": "Profile update successfully!",
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "USER",
    "isActive": true,
    "profileImage": "https://cloudinary.com/new-image.jpg",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `401` - Authentication required
- `409` - Email already exists
- `500` - Server error

---

### Get All Users

**GET** `/api/v1/user/`

Get list of all users (Admin only).

**Headers**: `Authorization: Bearer <access_token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `role` (optional): Filter by role
- `status` (optional): Filter by status

**Response**:
```json
{
  "success": true,
  "message": "All users retrieved successfully!",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "USER",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

**Status Codes**:
- `200` - Success
- `401` - Authentication required
- `403` - Admin access required
- `500` - Server error

---

### Update User Role

**PUT** `/api/v1/user/update-role/:id`

Update user's role (Admin only).

**Headers**: `Authorization: Bearer <access_token>`

**Path Parameters**:
- `id`: User ID

**Request Body**:
```json
{
  "role": "ADMIN"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User role update successfully!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `401` - Authentication required
- `403` - Admin access required
- `404` - User not found
- `500` - Server error

---

### Update User Status

**PUT** `/api/v1/user/update-status/:id`

Update user's active status (Admin only).

**Headers**: `Authorization: Bearer <access_token>`

**Path Parameters**:
- `id`: User ID

**Request Body**:
```json
{
  "isActive": false
}
```

**Response**:
```json
{
  "success": true,
  "message": "User status update successfully!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "isActive": false,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `401` - Authentication required
- `403` - Admin access required
- `404` - User not found
- `500` - Server error

---

### Get Customer Followed Shops

**GET** `/api/v1/user/customer/followed-shops`

Get shops followed by customer.

**Headers**: `Authorization: Bearer <access_token>`

**Response**:
```json
{
  "success": true,
  "message": "Your following shop retrieved successfully!",
  "data": [
    {
      "id": 1,
      "name": "Shop Name",
      "description": "Shop description",
      "followedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Status Codes**:
- `200` - Success
- `401` - Authentication required
- `500` - Server error

## 📁 Media Management Endpoints

### Upload Multiple Files

**POST** `/api/v1/media/upload`

Upload multiple files with metadata to cloud storage.

**Headers**: `Authorization: Bearer <access_token>`

**Request**: Multipart form data

**Form Data**:
```
files: [file1, file2, file3] (multiple files)
folder: "uploads/profile-images" (optional)
altText: "Profile picture" (optional)
title: "User Profile" (optional)
caption: "Profile image for user" (optional)
description: "Detailed description" (optional)
userId: 1 (optional)
```

**Response**:
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": [
    {
      "id": 1,
      "name": "profile-image.jpg",
      "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/profile-image.jpg",
      "folder": "uploads/profile-images",
      "type": "image/jpeg",
      "size": 1024000,
      "altText": "Profile picture",
      "title": "User Profile",
      "caption": "Profile image for user",
      "description": "Detailed description",
      "uploadedBy": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Status Codes**:
- `201` - Success
- `400` - Invalid request
- `401` - Authentication required
- `413` - File too large
- `415` - Unsupported media type
- `500` - Server error

---

### Get All Media

**GET** `/api/v1/media/`

Retrieve all media files (Super Admin only).

**Headers**: `Authorization: Bearer <access_token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `folder` (optional): Filter by folder
- `type` (optional): Filter by file type
- `uploadedBy` (optional): Filter by uploader

**Response**:
```json
{
  "success": true,
  "message": "All media retrieved successfully",
  "data": {
    "media": [
      {
        "id": 1,
        "name": "profile-image.jpg",
        "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/profile-image.jpg",
        "folder": "uploads/profile-images",
        "type": "image/jpeg",
        "size": 1024000,
        "altText": "Profile picture",
        "title": "User Profile",
        "caption": "Profile image for user",
        "description": "Detailed description",
        "uploadedBy": 1,
        "uploader": {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

**Status Codes**:
- `200` - Success
- `401` - Authentication required
- `403` - Super Admin access required
- `500` - Server error

---

### Get Media by ID

**GET** `/api/v1/media/:id`

Retrieve specific media file by ID (Super Admin only).

**Headers**: `Authorization: Bearer <access_token>`

**Path Parameters**:
- `id`: Media ID

**Response**:
```json
{
  "success": true,
  "message": "Media retrieved successfully",
  "data": {
    "id": 1,
    "name": "profile-image.jpg",
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/profile-image.jpg",
    "folder": "uploads/profile-images",
    "type": "image/jpeg",
    "size": 1024000,
    "altText": "Profile picture",
    "title": "User Profile",
    "caption": "Profile image for user",
    "description": "Detailed description",
    "uploadedBy": 1,
    "uploader": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Success
- `401` - Authentication required
- `403` - Super Admin access required
- `404` - Media not found
- `500` - Server error

---

### Update Media Metadata

**PATCH** `/api/v1/media/:id`

Update media file metadata (Super Admin only).

**Headers**: `Authorization: Bearer <access_token>`

**Path Parameters**:
- `id`: Media ID

**Request Body**:
```json
{
  "altText": "Updated alt text",
  "title": "Updated title",
  "caption": "Updated caption",
  "description": "Updated description"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Media updated successfully",
  "data": {
    "id": 1,
    "name": "profile-image.jpg",
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/profile-image.jpg",
    "folder": "uploads/profile-images",
    "type": "image/jpeg",
    "size": 1024000,
    "altText": "Updated alt text",
    "title": "Updated title",
    "caption": "Updated caption",
    "description": "Updated description",
    "uploadedBy": 1,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request
- `401` - Authentication required
- `403` - Super Admin access required
- `404` - Media not found
- `500` - Server error

---

### Delete Media

**DELETE** `/api/v1/media/:id`

Delete media file from cloud storage and database (Super Admin only).

**Headers**: `Authorization: Bearer <access_token>`

**Path Parameters**:
- `id`: Media ID

**Response**:
```json
{
  "success": true,
  "message": "Media deleted successfully",
  "data": {
    "message": "Media deleted successfully"
  }
}
```

**Status Codes**:
- `200` - Success
- `401` - Authentication required
- `403` - Super Admin access required
- `404` - Media not found
- `500` - Server error

## 📊 Status Codes

| Code | Description |
|------|-------------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid request data |
| `401` | Unauthorized - Authentication required |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource not found |
| `409` | Conflict - Resource already exists |
| `413` | Payload Too Large - File too large |
| `415` | Unsupported Media Type - Invalid file type |
| `500` | Internal Server Error - Server error |

## 🔍 Error Handling

### Common Error Scenarios

1. **Authentication Errors**
   - Missing or invalid JWT token
   - Expired access token
   - Invalid refresh token

2. **Authorization Errors**
   - Insufficient permissions
   - Role-based access denied
   - Admin access required

3. **Validation Errors**
   - Invalid request data
   - Missing required fields
   - Invalid file types or sizes

4. **Resource Errors**
   - Resource not found
   - Duplicate resource creation
   - File upload failures

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "path": "/api/v1/endpoint",
    "message": "Detailed error message"
  }
}
```

## 🚀 Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## 📝 Pagination

### Pagination Parameters

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Pagination Response

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🔐 Security Considerations

1. **JWT Tokens**: Use secure, random secrets
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure appropriate CORS origins
4. **File Uploads**: Validate file types and sizes
5. **Input Validation**: Validate all input data
6. **Error Messages**: Don't expose sensitive information

## 📚 Related Documentation

- [Authentication Module](./MODULES/AUTH_MODULE.md)
- [User Module](./MODULES/USER_MODULE.md)
- [Media Module](./MODULES/MEDIA_MODULE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)

// Commit 124

// Commit 128

// Commit 157

// Commit 190
