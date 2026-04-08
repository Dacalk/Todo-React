import { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css"; // Ensure this line exists!

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(API_URL, { text: input });
      setInput("");
      fetchTasks();
    } catch (err) {
      console.error("Add Error");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error("Delete Error");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !completed } : t));
    } catch (err) {
      console.error("Update Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-prime-500/30 flex items-start justify-center p-6 sm:p-12 md:pt-24 lg:pt-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-prime-600/20 rounded-full blur-[128px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px] translate-y-1/2"></div>
      
      <div className="glass-card w-full max-w-2xl rounded-[2.5rem] p-8 sm:p-12 transition-all duration-700 hover:shadow-[0_32px_128px_-32px_rgba(139,92,246,0.3)] relative z-10">
        
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 animate-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-prime-500/10 border border-prime-500/20 text-prime-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-prime-500 animate-pulse"></span>
           ToDo Task Manager
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4 premium-gradient-text">
            Task Manager
          </h1>
        </header>

        {/* Input Area */}
        <div className="relative group mb-12 animate-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="glow-aura"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-prime-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex flex-col sm:flex-row gap-3">
            <input 
              type="text"
              className="flex-1 glass-input px-6 py-4 rounded-2xl outline-none text-white placeholder:text-slate-500 text-lg font-light transition-all"
              placeholder="What's your next priority?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button 
              onClick={addTask}
              className="bg-prime-600 hover:bg-prime-500 text-white px-8 py-4 rounded-2xl transition-all active:scale-95 font-bold shadow-xl shadow-prime-900/40 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
              <span>Add Task</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scroll">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div 
                key={todo.id} 
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                className={`todo-item group flex items-center justify-between bg-white/[0.02] p-5 rounded-[1.5rem] border border-white/[0.05] transition-all ${todo.completed ? 'opacity-50' : ''}`}
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => toggleComplete(todo.id, todo.completed)}
                >
                  <span className={`text-slate-200 font-medium text-lg transition-all ${todo.completed ? 'line-through text-slate-500' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => toggleComplete(todo.id, todo.completed)}
                    className={`h-6 w-6 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${todo.completed ? 'bg-prime-500 border-prime-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]' : 'border-white/20 hover:border-prime-500/50'}`}
                  >
                    {Boolean(todo.completed) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2.5 rounded-xl bg-red-500/0 hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/[0.01] rounded-[2rem] border border-dashed border-white/10 animate-reveal" style={{ animationDelay: '0.2s' }}>
            </div>
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <footer className="mt-10 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-4 animate-reveal" style={{ animationDelay: '0.4s' }}>
            <div className="text-slate-400 text-sm font-medium">
              <span className="text-prime-400 font-bold">{todos.filter(t => !t.completed).length}</span> active focus points
            </div>
            <div className="flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] uppercase tracking-widest font-black text-emerald-500/80">Cloud Authenticated</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;