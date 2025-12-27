# Books API Spec

## create Book API

Endpoint : POST /api/addbook

Request Body :

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "stock": 3
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "title": "Atomic Habits",
    "author": "James Clear",
    "stock": 3
  }
}
```

Response Body Error :

```json
{
  "message": "stock harus >= 0",
  "ziyad_error_code": "ZYD-ERR-VALIDATION",
  "trace_id": "K8Q2M1A9"
}
```

## Get books API

Endpoint : GET /api/book

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "title": "Atomic Habits",
      "author": "James Clear",
      "stock": 3
    }
  ]
}
```

## Borrow Book API

Endpoint : POST /api/borrow

Request Body :

```json
{
  "member_id": 10,
  "book_id": 1
}
```

Response Body Success :

```json
{
  "data": {
    "borrow_id": 1001,
    "member_id": 10,
    "book_id": 1,
    "status": "BORROWED",
    "borrowed_at": "2025-12-27T08:00:00.000Z"
  }
}
```

Response Body Error (Stok Habis)

```json
{
  "message": "Stok buku habis",
  "ziyad_error_code": "ZYD-ERR-001",
  "trace_id": "9XK2P1QZ"
}
```

Response Body Error (Kuota Member Habis)

```json
{
  "message": "Kuota pinjam member habis",
  "ziyad_error_code": "ZYD-ERR-002",
  "trace_id": "A8M1Z0TT"
}
```

Response Body Error (Member Not Found)

```json
{
  "message": "Member tidak ditemukan",
  "ziyad_error_code": "ZYD-ERR-404-MEMBER",
  "trace_id": "J2K9AA11"
}
```
