async function Log(stack, level, pkg, message) {
  const url = "http://20.244.56.144/evaluation-service/logs";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmNzMzA3NEByZ2lwdC5hYy5pbiIsImV4cCI6MTc1ODQ0NzkxNiwiaWF0IjoxNzU4NDQ3MDE2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMWUwMmRmYWItZmRhYS00ZjdkLWEzMWEtNDQ5MGQwMTBiM2ZlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiaGFyc2hpdCBuZWdpIiwic3ViIjoiY2YyMTQ1NjUtMjIwOS00MDU2LTgxNWMtYzZlMjRkNWFjMzAyIn0sImVtYWlsIjoiMjJjczMwNzRAcmdpcHQuYWMuaW4iLCJuYW1lIjoiaGFyc2hpdCBuZWdpIiwicm9sbE5vIjoiMjJjczMwNzQiLCJhY2Nlc3NDb2RlIjoiYXJ6VWNHIiwiY2xpZW50SUQiOiJjZjIxNDU2NS0yMjA5LTQwNTYtODE1Yy1jNmUyNGQ1YWMzMDIiLCJjbGllbnRTZWNyZXQiOiJDWWJIenhuUVRIakdQRkdUIn0.KplPYrPVJqATKhM1QiDUDSWMke8xP0l7wZtokNTiSbk";
  
  
  const body = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: message
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create log");
    }
    return data;
  } catch (error) {
    // Handle/log error locally
    // console.error(error);
    console.error("Logging middleware error:", error.message);
  }
}

export {Log};
