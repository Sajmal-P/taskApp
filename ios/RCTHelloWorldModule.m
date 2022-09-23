// RCTCalendarModule.m
#import "RCTHelloWorldModule.h"

@implementation RCTHelloWorldModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getCustomName:   (RCTResponseSenderBlock)callback)
{
 
 callback(@[@("Hello from Ios")]);

}


 



@end
