const appendData = <T>(data: T): FormData => {
  const serverData = new FormData();
  for (const key in data) {
    serverData.append(key, data[key] as string | Blob);
  }
  return serverData;
};

export { appendData };
