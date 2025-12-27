# Member API Spec

## create Book API

Endpoint : POST /api/members

Request Body :

```json
{
  "name": "Joko Susanto",
  "quota": 2
}
```

Response Body Success :

```json
{
  "data": {
    "id": 10,
    "name": "Joko Susanto",
    "quota": 2
  }
}
```

Response Body Error :

```json
{
  "message": "quota minimal 1",
  "ziyad_error_code": "ZYD-ERR-VALIDATION",
  "trace_id": "T1Z9P0QW"
}
```

## Get Member API

Endpoint : GET /api/members/:memberId

Response Body Success :

```json
{
  "data": {
    "id": 10,
    "name": "Joko Susanto",
    "quota": 2
  }
}
```

Response Body Error :

```json
{
  "message": "Member tidak ditemukan",
  "ziyad_error_code": "ZYD-ERR-404-MEMBER",
  "trace_id": "J2K9AA11"
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
