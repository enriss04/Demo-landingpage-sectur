import { Button, TextField, CircularProgress, Paper, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

// Definimos la paleta de colores para reutilizar
const colors = {
  guinda: '#8A0D33',
  guindaOscuro: '#700a29',
  oro: '#DDC9A3',
  texto: '#333333'
};

export default function Login() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    userName: '',
    userPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  // Expresión regular: Letras y números, 1 a 15 caracteres
  const usuarioRegex = /^[a-zA-Z0-9]{1,15}$/;

  // Validaciones derivadas
  const isNameValid = credential.userName === '' || usuarioRegex.test(credential.userName);
  const isPassValid = credential.userPassword === '' || usuarioRegex.test(credential.userPassword);
  const canSubmit = credential.userName && credential.userPassword && isNameValid && isPassValid;

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND}/validate/${credential.userName},${credential.userPassword}`);
      const data = await response.json();

      if (data.message) {
        // Aquí podrías usar un Snackbar de MUI en lugar de alert
        alert(data.message);
      } else {
        cookies.set('usuario', data.username, { path: "/" });
        navigate('/pagina_principal');
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <Paper 
        elevation={4} 
        sx={{ 
          padding: 4, 
          maxWidth: 400, 
          width: '100%', 
          borderRadius: 2,
          borderTop: `6px solid ${colors.guinda}` 
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.guinda, textTransform: 'uppercase', letterSpacing: 1 }}>
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Panel de Administración Turística
            </Typography>
          </Box>

          <TextField
            label="Nombre de usuario"
            name="userName"
            variant="outlined"
            fullWidth
            value={credential.userName}
            onChange={handleChange}
            error={!isNameValid}
            helperText={!isNameValid ? "Solo letras y números (máx. 15)" : ""}
            disabled={loading}
            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: colors.guinda } }}
          />

          <TextField
            label="Contraseña"
            name="userPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={credential.userPassword}
            onChange={handleChange}
            error={!isPassValid}
            helperText={!isPassValid ? "Caracteres especiales no permitidos" : ""}
            disabled={loading}
            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: colors.guinda } }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!canSubmit || loading}
            sx={{
              backgroundColor: colors.guinda,
              paddingY: 1.5,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: colors.guindaOscuro },
              '&.Mui-disabled': { backgroundColor: '#cccccc' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "INGRESAR"}
          </Button>

          <Typography variant="caption" sx={{ textAlign: 'center', mt: 2, color: '#999' }}>
            © 2026 Secretaría de Turismo del Estado
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}