import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO {

    // Método para registrar un nuevo usuario
    public boolean registrarUsuario(String nombre, String apellidos, String fechaNacimiento, int edad, String telefono, String correo, String contrasena) {
        String sql = "INSERT INTO usuarios (nombre, apellidos, fecha_nacimiento, edad, telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, nombre);
            pstmt.setString(2, apellidos);
            pstmt.setDate(3, java.sql.Date.valueOf(fechaNacimiento)); // formato: "YYYY-MM-DD"
            pstmt.setInt(4, edad);
            pstmt.setString(5, telefono);
            pstmt.setString(6, correo);
            pstmt.setString(7, contrasena);

            int filas = pstmt.executeUpdate();

            if (filas > 0) {
                System.out.println("✅ Usuario registrado correctamente");
                return true;
            } else {
                System.err.println("⚠️ No se i

