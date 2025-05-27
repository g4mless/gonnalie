import { createSignal } from "solid-js";
import { supabase } from "./supabase";

function App() {
  const [message, setMessage] = createSignal("");
  const [status, setStatus] = createSignal("");

  const sendMessage = async () => {
    const content = message().trim();
    if (!content) return setStatus("⚠️ Pesan kosong!");

    const { error } = await supabase.from("messages").insert({ content });
    if (error) {
      setStatus("❌ Gagal mengirim.");
    } else {
      setStatus("✅ Pesan terkirim!");
    }
  };

  return (
    <main class="min-h-screen bg-gray-100/80 dark:bg-neutral-900/100 backdrop-blur-sm flex flex-col items-center justify-center p-4">
      <div class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-lg shadow-xl rounded-xl p-6 w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-4 dark:text-white">Kirim Pesan Anonim 🕵️ (Ke Galang/g4mless)</h1>
        <textarea
          class="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
          rows={4}
          placeholder="Tulis sesuatu..."
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
        <button
          class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={sendMessage}
        >
          Kirim
        </button>
        {status() && <p class="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">{status()}</p>}
      </div>
    </main>
  );
}

export default App;
