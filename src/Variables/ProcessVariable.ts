const appendData = <T>(data: T): FormData => {
const serverData = new FormData();
for (const key in data) {
  serverData.append(key, data[key] as unknown as string | Blob);
}
return serverData;
}

export { appendData };



    // const [open, setOpen] = useState<boolean>(false);
    // const [status, setStatus] = useState<boolean>(false);
    // const [color, setColor] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>('');
    // const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    // const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    // const UserId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';