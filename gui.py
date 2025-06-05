import tkinter as tk

class NukieApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Nukie Protocol")
        self.geometry("300x200")
        label = tk.Label(self, text="Welcome to Nukie!")
        label.pack(pady=20)
        start_button = tk.Button(self, text="Start", command=self.start)
        start_button.pack(pady=10)

    def start(self):
        print("Start button clicked")

if __name__ == "__main__":
    app = NukieApp()
    app.mainloop()
