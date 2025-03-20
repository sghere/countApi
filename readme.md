# Count API Usage

This API allows you to manage counts associated with a unique key. You can increment the count and reset it to zero for any given key.

## API Endpoints

### 1. Increment the Count

**Route**: `/key/count`  
**Method**: `GET`  
**Description**: Retrieves the current count for a given key. If the key exists, it increments the count by 1. If the key does not exist, it creates a new entry with a count of 1.

#### Example Request:

GET http://localhost:3000/exampleKey/count

#### Example Response:

```
{
  "key": "exampleKey",
  "count": 1
}
```

---

### 2. Reset the Count

**Route**: `/key/reset`  
**Method**: `GET`  
**Description**: Resets the count for a given key to 0. If the key doesn't exist, it creates a new entry with the count set to 0.

#### Example Request:

GET http://localhost:3000/exampleKey/reset

#### Example Response:

```
{
  "key": "exampleKey",
  "count": 0
}
```

---

## Error Handling

If the API encounters an issue, it will return a `500 Internal Server Error` with the following message:

```
{
  "message": "Internal Server Error"
}
```
