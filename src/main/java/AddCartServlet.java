import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet(name = "AddCartServlet", urlPatterns = "/addShopingCart")
public class AddCartServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        int userid = 0;
        for (Cookie i:cookies
             ) {
            System.out.println(i.getName());
            System.out.println(i.getValue());
            if (i.getName().equals("userid")){
                userid = Integer.valueOf(i.getValue());
            }
        }
        int productid = Integer.valueOf(request.getParameter("product_id"));
        try {
            Connection conn = Connect.getConn();
            String sql = "update shopping_cart set number_of = number_of + 1 where product_id = ? and user_id = ?";
            PreparedStatement psmt = conn.prepareStatement(sql);
            psmt.setInt(1, productid);
            psmt.setInt(2, userid);
            if (psmt.executeUpdate()<1){
                sql = "insert into shopping_cart(product_id, user_id, number_of) values (?, ?, 1)";
                psmt = conn.prepareStatement(sql);
                psmt.setInt(1, productid);
                psmt.setInt(2, userid);
                psmt.executeUpdate();
            }
            psmt.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        response.getWriter().println(1);
    }
}
