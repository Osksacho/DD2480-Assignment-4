package org.apache.streampipes.processors.transformation.jvm.processor.booloperator.counter;

import org.apache.streampipes.model.graph.DataProcessorDescription;
import org.apache.streampipes.model.graph.DataProcessorInvocation;
import org.apache.streampipes.model.runtime.Event;
import org.apache.streampipes.model.runtime.EventFactory;
import org.apache.streampipes.model.runtime.SchemaInfo;
import org.apache.streampipes.model.runtime.SourceInfo;
import org.apache.streampipes.sdk.helpers.Tuple2;
import org.apache.streampipes.test.generator.EventStreamGenerator;
import org.apache.streampipes.test.generator.InvocationGraphGenerator;
import org.apache.streampipes.test.generator.grounding.EventGroundingGenerator;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;


public class TestBooleanCounterProcessor {

  //  @org.junit.runners.Parameterized.Parameter(3)
   // public List<Tuple2<Integer, Boolean>> eventSettings;

    private static final Logger LOG = LoggerFactory.getLogger(TestBooleanCounterProcessor.class);
    @Test
    public void testBooleanCounter(){
        DataProcessorDescription originalGraph = new BooleanCounterController().declareModel();
        originalGraph.setSupportedGrounding(EventGroundingGenerator.makeDummyGrounding());

        DataProcessorInvocation graph =
                InvocationGraphGenerator.makeEmptyInvocation(originalGraph);

        graph.setInputStreams(Collections
                .singletonList(EventStreamGenerator
                        .makeStreamWithProperties(Collections.singletonList("randomValue"))));

        graph.setOutputStream(EventStreamGenerator.makeStreamWithProperties(Collections.singletonList("randomValue")));

        graph.getOutputStream().getEventGrounding().getTransportProtocol().getTopicDefinition()
                .setActualTopicName("output-topic");
        BooleanCounterParameters params = new BooleanCounterParameters(graph,"o::randomValue", 2);

        BooleanCounter bc = new BooleanCounter();

        bc.onInvocation(params,null,null);

        sendEvents(bc);
        LOG.info("Expected match count is {}", 3);
        LOG.info("Actual match count is {}", bc.getCounter());

        assertEquals(3, bc.getCounter());


    }
    // create event(s)
    private void sendEvents(BooleanCounter bc) {
        List<Tuple2<Integer, Event>> events = makeEvents();
        for (Tuple2<Integer, Event> event : events) {
          LOG.info("Sending event with value " + event.v.getFieldBySelector("o::randomValue"));
            bc.onEvent(event.v, null);
            try {
                Thread.sleep(event.k);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private List<Tuple2<Integer, Event>> makeEvents() {
        List<Tuple2<Integer, Event>> events = new ArrayList<>();
        boolean[] arr = {false,false,true,false,true,false,true,true};
        for (boolean b : arr) {
            events.add(makeEvent(100,b));
        }
        return events;
    }

    private Tuple2<Integer, Event> makeEvent(Integer timeout, Boolean value) {
        Map<String, Object> map = new HashMap<>();
        map.put("randomValue", value);
        return new Tuple2<>(timeout, EventFactory.fromMap(map));
    }
}
