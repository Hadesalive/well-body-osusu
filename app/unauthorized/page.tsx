export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">403</h1>
      <p className="text-lg">Unauthorized Access</p>
      <p className="text-muted-foreground">
        You do not have permission to view this page.
      </p>
    </div>
  );
}
