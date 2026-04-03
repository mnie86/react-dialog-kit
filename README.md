# react-dialog-kit

A lightweight, type‑safe and scalable dialog manager for React applications.  
It provides a centralized registry, and a clean API for opening and closing dialogs from anywhere in your app.

You can define all your dialogs in a single array and let the provider render and manage them from one centralized location.
The library has zero dependencies and uses React Context internally to handle the dialog state.

Dialogs are registered through a single array, allowing the provider to render and manage all dialogs from one unified entry point.
---

## 🚀 Installation

```bash
npm install react-dialog-kit
```

```bash
yarn add react-dialog-kit
```

✨ Features
Centralized dialog registration

Dynamic dialog stack management

Optional parameter validation

Simple and declarative API

Fully typed (TypeScript)

---

## 🧩 Basic Usage
1. Register dialogs inside the provider

```javascript
import { DialogKitProvider } from "react-dialog-kit";
import { TestDialog } from "./dialogs/TestDialog";

const dialogs = [
    {
        key: "testDialog",
        component: TestDialog
    }
];

export function App() {
    return (
        <DialogKitProvider dialogs={dialogs}>
            <App />
        </DialogKitProvider>
    );
}
```

2. Open a dialog from anywhere
```javascript
import { useDialogKit } from "react-dialog-kit";

export function TestButton() {
  const { openDialog } = useDialogKit();

  return (
    <button onClick={() => openDialog("testDialog", { message: "Hello!" })}>
      Open dialog
    </button>
  );
}
```

3. Implement the dialog component
```javascript
export function TestDialog({ params, closeDialog }) {
  return (
    <div className="dialog">
      <p>{params.message}</p>
      <button onClick={closeDialog}>Close</button>
    </div>
  );
}
```

```javascript
export function TestMuiDialog({ params, closeDialog }) {
  return (
    <Dialog open onClose={closeDialog}>
      <DialogTitle>{params.message}</DialogTitle>
      <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
```

## License
MIT