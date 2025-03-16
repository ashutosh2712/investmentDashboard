<h1>Investment Portfolio Dashboard</h1>

<p>A full-stack web application for managing and analyzing mutual fund investments. The system includes a FastAPI backend, React frontend, and PostgreSQL database running via Docker.</p>

---

<h2>Features</h2>
<ul>
  <li><b>Investment Overview</b>: Track the amount invested, NAV, and returns on mutual funds.</li>
  <li><b>Sector Allocation Analysis</b>: Breakdown of investments based on different industry sectors.</li>
  <li><b>Stock Allocation</b>: Visualize which stocks are held across various mutual funds.</li>
  <li><b>Market Capitalization</b>: View allocations across Large Cap, Mid Cap, and Small Cap funds.</li>
  <li><b>Overlap Analysis</b>: Identify mutual funds that hold the same stocks to avoid over-concentration.</li>
  <li><b>Performance Metrics</b>: Track portfolio performance over time using key financial indicators.</li>
</ul>

---

<h2>Tech Stack</h2>
<ul>
  <li><b>Backend</b>: FastAPI (Python)</li>
  <li><b>Frontend</b>: React (JavaScript, Tailwind CSS)</li>
  <li><b>Database</b>: PostgreSQL (via Docker)</li>
  <li><b>Additional Libraries</b>:
    <ul>
      <li><b>Backend</b>: SQLAlchemy, Uvicorn, Alembic, Pydantic</li>
      <li><b>Frontend</b>: Axios, Recharts</li>
    </ul>
  </li>
</ul>

---

<h2>Prerequisites</h2>
<p>Ensure you have the following installed:</p>
<ul>
  <li><a href="https://www.python.org/">Python 3.9+</a></li>
  <li><a href="https://nodejs.org/">Node.js 18+</a></li>
  <li><a href="https://www.docker.com/">Docker</a></li>
  <li><a href="https://git-scm.com/">Git</a></li>
</ul>

---

<h2>Running the Application with Docker</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre><code>
git clone https://github.com/your-username/investment-dashboard.git
cd investment-dashboard
</code></pre>

<h3>2️⃣ Build and Start the Docker Containers</h3>
<pre><code>docker-compose up --build -d</code></pre>
This will:
<ul>
  <li>Start the PostgreSQL database container.</li>
  <li>Start the FastAPI backend container.</li>
  <li>Start the React frontend container.</li>
</ul>

<h3>3️⃣ Verify Running Containers</h3>
Run the following command to ensure all services are running:
<pre><code>docker ps</code></pre>

<h3>4️⃣ Access the Application</h3>
<ul>
  <li><strong>React Frontend:</strong> <a href="http://localhost:5173" target="_blank">http://localhost:5173</a></li>
  <li><strong>FastAPI Backend:</strong> <a href="http://localhost:8000/docs" target="_blank">http://localhost:8000/docs</a> (Swagger UI)</li>
  <li><strong>PostgreSQL Database:</strong> Accessible on port <code>5432</code>.</li>
</ul>

---

<h2>Stopping the Application</h2>
<p>To stop the running containers:</p>
<pre><code>docker-compose down</code></pre>

---

<h2>Rebuilding the Containers</h2>
<p>If you make changes to the code and need to rebuild the containers:</p>
<pre><code>docker-compose up --build -d</code></pre>

---

<h2>Managing the Database</h2>

<h3>Access PostgreSQL Database</h3>
<p>To access the PostgreSQL database from the host machine:</p>
<pre><code>psql -h localhost -p 5432 -U postgres -d investment_db</code></pre>
<p>Use the following credentials:</p>
<ul>
  <li><strong>Username:</strong> <code>postgres</code></li>
  <li><strong>Password:</strong> <code>admin123</code></li>
</ul>

<h3>Running Migrations</h3>
<p>After modifying database models, apply migrations:</p>
<pre><code>docker-compose exec backend alembic upgrade head</code></pre>

---

<h2>Running the Application Locally (Without Docker)</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre><code>
git clone https://github.com/your-username/investment-dashboard.git
cd investment-dashboard
</code></pre>

<h3>2️⃣ Backend Setup (FastAPI)</h3>
<ol>
  <li><b>Navigate to the backend directory:</b></li>
  <pre><code>cd server</code></pre>
  <li><b>Create a Python virtual environment:</b></li>
  <pre><code>
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
  </code></pre>
  <li><b>Install dependencies:</b></li>
  <pre><code>pip install -r requirements.txt</code></pre>
  <li><b>Run database migrations:</b></li>
  <pre><code>alembic upgrade head</code></pre>
  <li><b>Start the FastAPI server:</b></li>
  <pre><code>uvicorn app.main:app --reload</code></pre>
</ol>

<p>The backend will run at <a href="http://127.0.0.1:8000/docs/">http://127.0.0.1:8000/docs/</a>.</p>

---

<h3>3️⃣ Frontend Setup (React)</h3>
<ol>
  <li><b>Navigate to the frontend directory:</b></li>
  <pre><code>cd ../client</code></pre>
  <li><b>Install dependencies:</b></li>
  <pre><code>npm install</code></pre>
  <li><b>Start the React development server:</b></li>
  <pre><code>npm run dev</code></pre>
</ol>

<p>The frontend will run at <a href="http://localhost:5173/">http://localhost:5173/</a>.</p>

---

<h2>Common Issues & Debugging</h2>

<h3>Checking Logs</h3>
<p>If something isn’t working, check container logs:</p>
<pre><code>docker logs investment-fastapi-backend</code></pre>

<h3>Fixing Port Conflicts</h3>
<p>If ports (8000, 5173, 5432) are in use, change them in <code>docker-compose.yml</code>:</p>
<pre><code>
ports:
  - "8001:8000"  # Change backend port
  - "5174:5173"  # Change frontend port
</code></pre>

<h3>Restarting a Specific Service</h3>
<pre><code>docker-compose restart backend</code></pre>

---

<h2>License</h2>
<p>This project is licensed under the MIT License. See the LICENSE file for details.</p>
