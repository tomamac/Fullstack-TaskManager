import "../styles/landing.css";
import mongologo from "../assets/mongo.png";
import expresslogo from "../assets/express.png";
import reactlogo from "../assets/react.png";
import nodelogo from "../assets/node.png";
import gologo from "../assets/go.png";
import postgreslogo from "../assets/postgres.png";

export default function Landing() {
  return (
    <div className="content" style={{ textAlign: "center", alignContent:'center'}}>
      <p>ยินดีต้อนรับสู่หน้าแรกของ Taskit</p>
      <p>
        เว็บแอพ ฯ นี้ถูกพัฒนาด้วย MongoDB, Express, React, Node, Golang และ
        Postgresql
      </p>
      <p>สมัครสมาชิกหรือเข้าสู่ระบบเพื่อเริ่มใช้งาน</p>
      <div style={{justifySelf:'center', alignContent:'center', height:'200px'}}>
        <img src={mongologo} alt="" />
        <img src={expresslogo} alt="" />
        <img src={reactlogo} alt="" />
        <img src={nodelogo} alt="" />
        <img src={gologo} alt="" />
        <img src={postgreslogo} alt="" />
      </div>
    </div>
  );
}
