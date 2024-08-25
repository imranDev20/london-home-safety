export default function Stepper() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <div className="flex flex-1 items-center justify-start gap-4">
          <div className="flex flex-col items-center">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-medium">1</span>
            </div>
            <span className="mt-2 text-sm font-medium">Step 1</span>
          </div>
          <div className="h-1 flex-1 bg-muted" />
          <div className="flex flex-col items-center">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <span className="text-sm font-medium">2</span>
            </div>
            <span className="mt-2 text-sm font-medium">Step 2</span>
          </div>
          <div className="h-1 flex-1 bg-muted" />
          <div className="flex flex-col items-center">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <span className="text-sm font-medium">3</span>
            </div>
            <span className="mt-2 text-sm font-medium">Step 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
