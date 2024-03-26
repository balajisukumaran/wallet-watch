package org.walletwatch;

import org.walletwatch.object.Alert;
import org.walletwatch.object.MessageBody;

import java.util.*;

public class AlertService {
    public static HashMap<String,List<MessageBody>> parseBody(List<Alert> alerts){
        HashMap<String,List<MessageBody>> result = new HashMap<>();

        for(Alert alert : alerts){
            if(!result.containsKey(alert.getEmail()))
                result.put(alert.getEmail(), new ArrayList<>());

            result.get(alert.getEmail()).add(new MessageBody(alert.getC_name(),alert.getOverspend()));
        }

        return result;
    }
}
