const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'eoomeqfuukrkeq',
  host: 'ec2-54-88-130-244.compute-1.amazonaws.com',
  database: 'dfk32hupc27lao',
  password: 'ab7e3d3a1d1d7996f2737bde1e89ee48afb8af795796ac563d1fed5942ff70b6',
  port: 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM public.usuarios');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO public.usuarios( nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.post('/borrarpacientes', async (req, res) => {
  const { numid } = req.body;
  await pool.query(
    `DELETE FROM public.usuarios WHERE numid='${numid}'`
  );
  res.send(`PACIENTE '${numid}' ELIMINADO`);
});

router.post('/actualizarpacientes',async(req, res)=>
{
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    
    `UPDATE public.usuarios SET nombre='${nombre}', apellido='${apellido}' WHERE numid='${numid}'`
  );
  res.send(`PACIENTE '${numid}' ACTUALIZADO`);
}
);