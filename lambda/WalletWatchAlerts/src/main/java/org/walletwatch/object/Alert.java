package org.walletwatch.object;

public class Alert {
    String userid;
    String email;
    String c_name;

    public String getUserid() {
        return userid;
    }

    public Alert(String userid, String email, String c_name, String overspend) {
        this.userid = userid;
        this.email = email;
        this.c_name = c_name;
        this.overspend = overspend;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getC_name() {
        return c_name;
    }

    public void setC_name(String c_name) {
        this.c_name = c_name;
    }

    public String getOverspend() {
        return overspend;
    }

    public void setOverspend(String overspend) {
        this.overspend = overspend;
    }

    String overspend;
}
