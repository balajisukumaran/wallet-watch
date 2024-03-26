package org.walletwatch.object;

public class MessageBody {
    public String getCategoryName() {
        return CategoryName;
    }

    public MessageBody(String categoryName, String overspend) {
        CategoryName = categoryName;
        Overspend = overspend;
    }

    public void setCategoryName(String categoryName) {
        CategoryName = categoryName;
    }

    public String getOverspend() {
        return Overspend;
    }

    public void setOverspend(String overspend) {
        Overspend = overspend;
    }

    String CategoryName;
    String Overspend;

}
