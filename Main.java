public class Main {
    public static void main(String[] args) {
        UserDAO dao = new UserDAO();
        boolean resultado = dao.crearUsuario(
                "Santiago", "Aguilar", "1997-09-23", 28, "3120000000",
                "santiago@example.com", "123456"
        );
        if (resultado) {
            System.out.println("✅ Usuario guardado correctamente.");
        } else {
            System.out.println("❌ Error al guardar el usuario.");
        }
    }
}
